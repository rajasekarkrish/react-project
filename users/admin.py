from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models


# Register your models here.
class UserAdminConfig(UserAdmin):
    model = CustomUser
    search_fields = ('email', 'user_name', )
    list_filter = ('email', 'user_name',  'is_active', 'is_staff')
    ordering = ('-start_date',)
    list_display = ('email', 'user_name', 
                    'is_active', 'is_staff','company','department')
    fieldsets = (
        (None, {'fields': ('email', 'user_name',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Company', {'fields': ('company',)}),
         ('Department', {'fields': ('department',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name',  'password1', 'password2', 'is_active', 'is_staff','company','department','assign_to',)}
         ),
    )


admin.site.register(CustomUser, UserAdminConfig)