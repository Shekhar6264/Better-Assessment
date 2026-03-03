from marshmallow import Schema, fields, validate

class LockSeatSchema(Schema):
    user_email = fields.Email(required=True)

class ConfirmSeatSchema(Schema):
    user_email = fields.Email(required=True)