"""template URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from template.core import api as core_api
from template.core import views as core_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^api/login$', core_api.login, name='api_login'),
    url(r'^api/me/password$', core_api.change_password, name='api_change_password'),

    url(r'^login/', core_views.login_page, name='app_login_page'),
    url(r'^logout/', core_views.logout, name='app_logout'),
    url(r'^.*$', core_views.app_page, name='app_main_page'),
]
