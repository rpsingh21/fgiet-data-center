# Generated by Django 2.2.3 on 2019-07-28 08:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0007_auto_20190723_2050'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='mobile_no',
            field=models.CharField(blank=True, max_length=10),
        ),
    ]
