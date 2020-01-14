from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

from template.core.serializers import CoreUserSerializer


@login_required
@ensure_csrf_cookie
def app_page(request):
    return render(request, 'app.html', dict(
        initial_state=dict(
            user=CoreUserSerializer(instance=request.user).data
        )
    ))
