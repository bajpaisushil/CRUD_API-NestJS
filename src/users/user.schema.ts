import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Role{
    INTERN='Intern',
    ENGINEER='Engineer',
    ADMIN='Admin',
}

@Schema({
    timestamps: true
})

export class User{

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    role: Role;
}

export const UserSchema=SchemaFactory.createForClass(User)
