from django.test import TestCase

from django.contrib.auth.models import User
from rest_framework.test import APIClient


class AccountTest(TestCase):
    def setUp(self):
        User.objects.create_superuser(
            username='root',
            email='root@gmail.com',
            password='root@password'
        )

    def test_superUser(self):
        user = User.objects.get(username='root')
        self.assertEqual(user.username, 'root')

    def test_login(self):
        client = APIClient()
        response = client.login(username='root', password='root@password')
        self.assertEqual(response, True)

    def test_wrong_login(self):
        client = APIClient()
        response = client.login(username='root', password='root@paesword')
        self.assertEqual(response, False)

    def test_refresh_auth_token(self):
        client = APIClient()
        response = client.post(
            '/api/v1/login',
            {'username': 'root', 'password': 'root@password'},
            format='json'
        )
        response = client.post(
            '/api/v1/login/refresh',
            {'username': 'root', 'password': 'root@password'},
            format='json'
        )
        self.assertEqual(response, True)
        response = client.logout(response, True)
        self.assertEqual(response, True)
