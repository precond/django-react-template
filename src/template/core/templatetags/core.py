from django import template
from django.conf import settings


register = template.Library()


@register.simple_tag
def resource(name):
    return ('%s%s' % (settings.STATIC_URL, settings.RESOURCES[name])) if name in settings.RESOURCES else ''
