from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

from template.core.serializers import CoreUserSerializer


@login_required
@ensure_csrf_cookie
def app_page(request):
    return render(request, 'app.html', dict(
        app_resource='app_main_file',
        initial_state=dict(
            user=CoreUserSerializer(instance=request.user).data
        )
    ))


@ensure_csrf_cookie
def login_page(request):
    return render(request, 'app.html', dict(
        app_resource='app_login_file',
        initial_state=dict(next=request.GET.get('next', '/'))
    ))


def logout(request):
    auth_logout(request)
    return HttpResponseRedirect('/')
