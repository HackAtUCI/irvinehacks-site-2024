from collections import Counter

from pydantic import BaseModel, TypeAdapter

from services import mongodb_handler
from services.mongodb_handler import Collection
from utils.user_record import ApplicantStatus, Role


class ApplicantSummaryRecord(BaseModel):
    status: ApplicantStatus


async def applicant_summary() -> Counter[ApplicantStatus]:
    """Get summary of applicants by status."""
    records = await mongodb_handler.retrieve(
        Collection.USERS,
        {"role": Role.APPLICANT},
        ["status"],
    )
    applicants = TypeAdapter(list[ApplicantSummaryRecord]).validate_python(records)

    return Counter(applicant.status for applicant in applicants)
