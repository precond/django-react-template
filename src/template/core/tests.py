import json

from django.contrib.auth.models import User, Permission
from django.test import TestCase


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

    def login_user(self, username='one.user@test.com', password='1pass', expected_code=200):
        self.api_post('/api/login', {'username': username, 'password': password}, expected_code=expected_code)
        self.client.user = User.objects.get(username=username)

    def load_page(self, url, expected_template=None, expected_code=200, expected_exception=None, contains=None, not_contains=None):
        if expected_exception:
            with self.assertRaises(expected_exception):
                self.client.get(url, follow=True)
        else:
            response = self.client.get(url, follow=True)
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

    def api_get(self, url, expected_code=200):
        response = self.client.get(url, follow=True)
        self.assertEqual(response.status_code, expected_code)
        return response.json()

    def api_post(self, url, data, expected_code=200, patch=False):
        data = data if data else dict()
        method = self.client.patch if patch else self.client.post
        response = method(url, json.dumps(data), follow=True, content_type='application/json')
        self.assertEqual(response.status_code, expected_code)
        return response.json() if response.content else None

    def api_put(self, url, data, expected_code=204):
        data = data if data else dict()
        response = self.client.put(url, json.dumps(data), follow=True, content_type='application/json')
        self.assertEqual(response.status_code, expected_code)
        return response.json() if response.content else None

    def api_delete(self, url, expected_code=204):
        response = self.client.delete(url, follow=True)
        self.assertEqual(response.status_code, expected_code)
        return response.json() if response.content else None


class CoreTests(TestBase):

    def setUp(self):
        super(CoreTests, self).setUp()

    def test_login_page(self):
        response = self.load_page('/', expected_template='app.html')
        self.assertTrue('initial_state' in response.context)
        state = response.context['initial_state']
        self.assertEqual(state['next'], '/')
        self.login_user()

    def test_login_fail(self):
        self.login_user(password='notright', expected_code=403)

    def test_home_page(self):
        self.login_user()
        response = self.load_page('/', expected_template='app.html')
        self.assertTrue('initial_state' in response.context)
        state = response.context['initial_state']
        self.assertEqual(state['user']['id'], self.user1.id)
        self.assertEqual(state['user']['first_name'], 'One')
        self.assertEqual(state['user']['last_name'], 'User')
        self.assertEqual(state['user']['email'], 'one.user@test.com')
        self.assertFalse(state['user']['is_superuser'])

    def test_logout(self):
        self.login_user()
        self.client.logout()
        response = self.load_page('/', expected_template='app.html')
        self.assertTrue('initial_state' in response.context)
        state = response.context['initial_state']
        self.assertEqual(state['next'], '/')

    def test_change_password(self):
        self.login_user()
        self.api_post('/api/me/password', dict(
            password_current='1pass',
            password_new='iudvb238sa!',
        ), expected_code=204)
        self.login_user(password='iudvb238sa!')  # Make sure the new password works

    def test_change_password_wrong_current(self):
        self.login_user()
        response = self.api_post('/api/me/password', dict(
            password_current='notright',
            password_new='iudvb238sa!',
        ), expected_code=403)
        self.assertEqual(response['detail'], "Current password does not match")
        self.login_user(password='iudvb238sa!', expected_code=403)

    def test_change_password_new_invalid(self):
        self.login_user()
        response = self.api_post('/api/me/password', dict(
            password_current='1pass',
            password_new='aaa',
        ), expected_code=403)
        self.assertTrue("This password is too short" in response['detail'])
        self.login_user(password='aaa', expected_code=403)
