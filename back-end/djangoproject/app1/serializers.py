from rest_framework import serializers
from .models import UserInfo


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = [
            "id",
            "name",
            "surname",
            "email",
            "phone",
            "password",
            "avatarUrl"
        ]
        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def create(self, validated_data):
        user = UserInfo.objects.create_user(
            **validated_data
        )

        return user


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = [
            "id",
            "name",
            "surname",
            "email",
            "phone",
            "avatarUrl"
        ]