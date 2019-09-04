from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import get_template


def email(subject, mail, html_template, mail_context, from_email, to_emails):
    template = get_template(html_template)
    html_mail = template.render(mail_context)
    from_email = from_email or settings.EMAIL_HOST_USER
    send_mail(subject, mail, from_email, to_emails, html_message=html_mail)


def send_success_reg_mail(data):
    subject = 'Fee Registration Details'
    mail_context = {
        'form_id': data.form_id,
        'name': data.details['basic']['name']
    }
    mail_template = 'mail/success_mail.html'
    email(subject, None, mail_template, mail_context, None, [data.email])
