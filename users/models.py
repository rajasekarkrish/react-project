# Create your models here.
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from taskapp.models import Company,Department
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, password, **other_fields)

    def create_user(self, email, user_name,  password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                           **other_fields)
        user.set_password(password)
        user.save()
        return user

    # @receiver(reset_password_token_created)
    # def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    #     email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)

    #     send_mail(
    #         # title:
    #         "Password Reset for {title}".format(title="Some website title"),
    #         # message:
    #         email_plaintext_message,
    #         # from:
    #         "noreply@somehost.local",
    #         # to:
    #         [reset_password_token.user.email]
    #     )


class CustomUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('email address'), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    start_date = models.DateTimeField(default=timezone.now)
    about = models.TextField(_(
        'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False) 
    is_active = models.BooleanField(default=True)
    company=models.ForeignKey(Company,on_delete=models.CASCADE,blank=True,null=True,related_name="comp")
    department=models.ForeignKey(Department,on_delete=models.CASCADE,blank=True,null=True,related_name="depts")
    assign_to=models.ForeignKey("self",default=1,on_delete=models.PROTECT)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name',]

    def __str__(self):
        return self.user_name
        
class AuthTokenMstr(models.Model):
    auth_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=False)
    jwt_token = models.TextField(null=False)
    expire_ts = models.DateTimeField(null=False)
    login_time = models.DateTimeField(auto_now=True)
    ip = models.CharField(max_length=250, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'authtoken_mst'


        