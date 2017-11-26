import json

from django.contrib.auth.models import User, Permission
from django.test import TestCase, Client


class TestBase(TestCase):
    fixtures = ['initial_data.default.json', 'test_data.json']

    @staticmethod
    def add_role_permissions(role, permissions):
        for codename in permissions:
            role.permissions.add(Permission.objects.get(codename=codename))

    def setUp(self):
        self.user1 = User.objects.get(id=1)
        self.user2 = User.objects.get(id=2)
        self.user1.set_password('1pass')
        self.user1.save()
        self.user2.set_password('2pass')
        self.user2.save()

    def login_user(self, client=None, username='one.user@test.com', password='1pass', expected_template='app.html'):
        if not client:
            client = Client()
        response = client.post('/login/?next=/', {'username': username, 'password': password}, follow=True)
        self.assertTemplateUsed(response, expected_template)
        client.user = User.objects.get(username=username)
        return client

    def load_page(self, client, url, expected_template=None, expected_code=200, expected_exception=None, contains=None, not_contains=None):
        if expected_exception:
            with self.assertRaises(expected_exception):
                client.get(url, follow=True)
        else:
            response = client.get(url, follow=True)
            self.assertEqual(response.status_code, expected_code)
            if expected_template:
                self.assertTemplateUsed(response, expected_template)
            if contains:
                for text in contains:
                    self.assertContains(response, text)
            if not_contains:
                for text in not_contains:
                    self.assertNotContains(response, text)
            return response

    def api_get(self, client, url, expected_code=200):
        response = client.get(url, follow=True)
        self.assertEqual(response.status_code, expected_code)
        return response.json()

    def api_post(self, client, url, data, expected_code=200, patch=False):
        data = data if data else dict()
        method = client.patch if patch else client.post
        response = method(url, json.dumps(data), follow=True, content_type='application/json')
        self.assertEqual(response.status_code, expected_code)
        return response.json() if response.content else None

    def api_put(self, client, url, data, expected_code=204):
        data = data if data else dict()
        response = client.put(url, json.dumps(data), follow=True, content_type='application/json')
        self.assertEqual(response.status_code, expected_code)
        return response.json() if response.content else None

    def api_delete(self, client, url, expected_code=204):
        response = client.delete(url, follow=True)
        self.assertEqual(response.status_code, expected_code)
        return response.json() if response.content else None


class CoreTests(TestBase):

    def setUp(self):
        super(CoreTests, self).setUp()

    def test_login_page(self):
        self.login_user()

    def test_login_fail(self):
        self.login_user(password='notright', expected_template='registration/login.html')

    def test_home_page(self):
        c = self.login_user()
        response = self.load_page(c, '/', expected_template='app.html')
        self.assertTrue('state' in response.context)
        state = json.loads(response.context['state'])
        self.assertEqual(state['user']['id'], self.user1.id)
        self.assertEqual(state['user']['first_name'], 'One')
        self.assertEqual(state['user']['last_name'], 'User')
        self.assertEqual(state['user']['email'], 'one.user@test.com')
        self.assertFalse(state['user']['is_superuser'])

    def test_logout(self):
        c = self.login_user()
        c.logout()
        self.load_page(c, '/', expected_template='registration/login.html')
