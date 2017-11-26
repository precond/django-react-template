from django.contrib.auth.models import User

from rest_framework import serializers


class CoreUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'is_superuser', )
        depth = 1
