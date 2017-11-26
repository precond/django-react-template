import json

from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from template.core.serializers import CoreUserSerializer


@login_required
def app_page(request):
    state = dict(
        user=CoreUserSerializer(instance=request.user).data
    )
    return render(request, 'app.html', dict(state=json.dumps(state)))
