# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from enum import Enum
from logging import getLogger
from typing import Iterable, Literal, Tuple, TypedDict, Union, overload

import aiosendgrid
from httpx import HTTPStatusError
from sendgrid.helpers.mail import Email, Mail, Personalization
from typing_extensions import TypeAlias

log = getLogger(__name__)

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")


class Template(str, Enum):
    CONFIRMATION_EMAIL = "d-83d42cc17b54456183eeb946ba58861a"
    GUEST_TOKEN = "d-1998e588ddf74c6d9ede36b778730176"
    ACCEPTED_EMAIL = "d-062e7106a0d64d49ad9f03325bbc7286"
    WAITLISTED_EMAIL = "d-9178c043de134a71a4fdbe513d35f89f"
    REJECTED_EMAIL = "d-71ef30ac91a941e0893b7680928d80b7"
    RSVP_REMINDER = "d-0c2642268c404c138359ac1b9d41e78c"
    WAITLIST_RELEASE_EMAIL = "d-19af50295ac14e82a7810791a175b8e9"


class PersonalizationData(TypedDict):
    email: str


class ConfirmationPersonalization(PersonalizationData):
    first_name: str
    last_name: str


class GuestTokenPersonalization(PersonalizationData):
    passphrase: str


class ApplicationUpdatePersonalization(PersonalizationData):
    first_name: str


ApplicationUpdateTemplates: TypeAlias = Literal[
    Template.ACCEPTED_EMAIL,
    Template.WAITLISTED_EMAIL,
    Template.REJECTED_EMAIL,
    Template.RSVP_REMINDER,
    Template.WAITLIST_RELEASE_EMAIL,
]


@overload
async def send_email(
    template_id: Literal[Template.CONFIRMATION_EMAIL],
    sender_email: Tuple[str, str],
    receiver_data: ConfirmationPersonalization,
    send_to_multiple: Literal[False] = False,
    reply_to: Union[Tuple[str, str], None] = None,
) -> None:
    ...


@overload
async def send_email(
    template_id: Literal[Template.GUEST_TOKEN],
    sender_email: Tuple[str, str],
    receiver_data: GuestTokenPersonalization,
    send_to_multiple: Literal[False] = False,
    reply_to: Union[Tuple[str, str], None] = None,
) -> None:
    ...


@overload
async def send_email(
    template_id: Literal[Template.CONFIRMATION_EMAIL],
    sender_email: Tuple[str, str],
    receiver_data: Iterable[ConfirmationPersonalization],
    send_to_multiple: Literal[True],
    reply_to: Union[Tuple[str, str], None] = None,
) -> None:
    ...


@overload
async def send_email(
    template_id: ApplicationUpdateTemplates,
    sender_email: Tuple[str, str],
    receiver_data: Iterable[ApplicationUpdatePersonalization],
    send_to_multiple: Literal[True],
    reply_to: Union[Tuple[str, str], None] = None,
) -> None:
    ...


@overload
async def send_email(
    template_id: ApplicationUpdateTemplates,
    sender_email: Tuple[str, str],
    receiver_data: ApplicationUpdatePersonalization,
    send_to_multiple: Literal[False],
    reply_to: Union[Tuple[str, str], None] = None,
) -> None:
    ...


async def send_email(
    template_id: Template,
    sender_email: Tuple[str, str],
    receiver_data: Union[PersonalizationData, Iterable[PersonalizationData]],
    send_to_multiple: bool = False,
    reply_to: Union[Tuple[str, str], None] = None,
) -> None:
    """
    Send a personalized templated email to one or multiple receivers via SendGrid
    """
    try:
        email_message = Mail()

        if send_to_multiple:
            if isinstance(receiver_data, dict):
                raise TypeError(
                    f"Expected {list} for receiver_data but got {type(receiver_data)}"
                )
            for r in receiver_data:
                p = Personalization()
                p.add_to(Email(email=r["email"], dynamic_template_data=r))
                email_message.add_personalization(p)
        else:
            if not isinstance(receiver_data, dict):
                raise TypeError(
                    f"Expected {dict} for receiver_data but got {type(receiver_data)}"
                )
            p = Personalization()
            p.add_to(
                Email(
                    email=receiver_data["email"],
                    dynamic_template_data=receiver_data,
                )
            )
            email_message.add_personalization(p)

        if reply_to is not None:
            email_message.reply_to = reply_to

        email_message.from_email = sender_email
        email_message.template_id = template_id

        async with aiosendgrid.AsyncSendGridClient(api_key=SENDGRID_API_KEY) as client:
            response = await client.send_mail_v3(body=email_message.get())
            log.debug(response.status_code)
            log.debug(response.headers)
    except HTTPStatusError as e:
        log.exception("During SendGrid processing: %s", e)
        raise RuntimeError("Could not send email with SendGrid")
