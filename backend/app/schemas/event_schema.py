from marshmallow import Schema, fields, validate

class EventCreateSchema(Schema):
    name = fields.String(required=True, validate=validate.Length(min=1))
    date = fields.DateTime(required=True, format="%Y-%m-%dT%H:%M:%S")
    total_seats = fields.Integer(required=True, validate=validate.Range(min=1))