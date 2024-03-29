# Generated by Django 4.1.1 on 2022-12-01 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("taskapp", "0002_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="company",
            name="address",
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name="company",
            name="company_description",
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name="company",
            name="name",
            field=models.CharField(max_length=250, null=True, unique=True),
        ),
    ]
