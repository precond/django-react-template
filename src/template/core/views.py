import json

from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework.decorators import api_view, parser_classes, renderer_classes
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from template.core.serializers import CoreUserSerializer


@login_required
@ensure_csrf_cookie
def app_page(request):
    state = dict(
        user=CoreUserSerializer(instance=request.user).data
    )
    return render(request, 'app.html', dict(state=json.dumps(state)))


@login_required
@api_view(['POST'])
@parser_classes((JSONParser,))
@renderer_classes((JSONRenderer,))
def change_password(request):
    if 'password_current' not in request.data or not check_password(request.data['password_current'], request.user.password):
        return Response({'detail': 'Current password does not match'}, status=403)

    if 'password_new' not in request.data or 'password_again' not in request.data or request.data['password_new'] != request.data['password_again']:
        return Response({'detail': 'New passwords do not match'}, status=403)

    try:
        validate_password(request.data['password_new'], request.user)
    except ValidationError as e:
        return Response({'detail': '%s' % e}, status=403)

    request.user.set_password(request.data['password_new'])
    request.user.save()
    update_session_auth_hash(request, User.objects.get(id=request.user.id))
    return Response(None, status=204)
