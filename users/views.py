from audioop import reverse
from base64 import urlsafe_b64decode
from urllib import response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status,serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser
from .serializers import RegisterUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .serializers import ChangePasswordSerializer,ResetPasswordSerializer,EmailSerializer
from rest_framework.permissions import IsAuthenticated   
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.urls import reverse
from django.contrib.auth.hashers import make_password
from rest_framework import generics,viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response





class CustomUserCreate(viewsets.ViewSet):
    def user(self,request):
        queryset=CustomUser.objects.all()
        serializer_class = RegisterUserSerializer(queryset,many=True).data
        return Response({'data':serializer_class})


    permission_classes = [AllowAny]
    def post(self, request):
        data = request.data
        email = data['email']
        user_name=data['user_name']
        password= make_password(data['password'])
        is_active = data['is_active']
        is_staff=data['is_staff']
        company_id=data['company_id']
        department_id=data['department_id']
        assign_to_id=data['assign_to_id']
        CustomUser(email=email,user_name=user_name,password=password,is_active=is_active,is_staff=is_staff,
        company_id=company_id,department_id=department_id,assign_to_id=assign_to_id).save()
        return Response("user created successfully", status=status.HTTP_201_CREATED)
        


        



class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                       context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'user_name':user.user_name,
            'is_staff':user.is_staff
        })



class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = CustomUser
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

