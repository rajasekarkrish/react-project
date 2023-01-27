from asyncore import write
from dataclasses import field
from email import message
from logging import raiseExceptions
from typing_extensions import Required
from urllib import response
from taskapp.models import Company, Department
from users.models import CustomUser,AuthTokenMstr
from rest_framework import serializers,generics,status
from rest_framework.response import Response
from rest_framework import status
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=CustomUser.objects.all())]
            )
    class Meta:
        model =CustomUser
        fields = ('email', 'password', 'name')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 6}}

        def create(self, validated_data):
            user = CustomUser.objects.create_user('name',validated_data['email'],
                validated_data['password'],)
            return user

class AuthTokenSerializer(serializers.Serializer):

    email = serializers.CharField()
    password = serializers.CharField(
        style = {'input_type':'password'},
        trim_whitespace = False
    )

    def validate(self, attrs):

        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request = self.context.get('request'),
            username = email,
            password = password
        )

        if not user:

            msg = Response('Unable to authenticate with provided crenditial')
            raise serializers.ValidationError(msg, code = 'authorization')

        attrs['user'] = user

        return attrs



class RegisterUserSerializer(serializers.ModelSerializer):
    company=serializers.SerializerMethodField('get_company')
    def get_company(self,data):
        id=data.company_id
        obj=Company.objects.get(id=id).name  #.exclude(id=None)
        return obj

    department = serializers.SerializerMethodField('get_department')
    def get_department(self, data):
        id = data.department_id
        obj=Department.objects.get(id=id).dept_name
        return obj

    assign_to = serializers.SerializerMethodField('get_assign')
    def get_assign(self, data):
        id = data.assign_to_id
        obj=CustomUser.objects.get(id=id).user_name
        return obj
    class Meta:
        model = CustomUser
        fields = ('id','email', 'user_name', 'password','is_active','is_staff','assign_to','company','department')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance



class EmailSerializer(serializers.Serializer):
    """
    Reset Password Email Request Serializer.
    """

    email = serializers.EmailField()

    class Meta:
        fields = ("email",)        

class ChangePasswordSerializer(serializers.Serializer):
    model =CustomUser

    """
    serializer for password change end points.
    """
    old_password=serializers.CharField(required=True)
    new_password=serializers.CharField(required=True)


    
class ResetPasswordSerializer(serializers.Serializer):
    password=serializers.CharField(write_only=True,min_length=8)

    class Meta:
        fields=('password',)

    def validate(self,data,):
        password=data.get("password")
        token=self.context.get("kwargs").get("token")
        encoded_pk=self.context.get("kwargs").get("encoded_pk")
            
        if token or encoded_pk is None:
            raise serializers.ValidationError("missing data")

        pk=urlsafe_base64_decode(encoded_pk).decode()
        user=CustomUser.objects.get(pk=pk)


        if not PasswordResetTokenGenerator().check_token(user, token):
            raise serializers.ValidationError("The reset token is invalid")

        user.set_password(password)
        user.save()
        return data


class ResetTokenSerializer(serializers.ModelSerializer):

    class Meta:
        model=AuthTokenMstr
        fields = ('user', 'jwt_token', 'expire_ts',)



        

