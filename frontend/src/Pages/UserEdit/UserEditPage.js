import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { getById, updateUser } from "../../services/userService"; // Removed unused `register`
import { useParams } from "react-router-dom";
import classes from "./UserEdit.module.css";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import { EMAIL } from "../../constant/patterns";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";

export default function UserEditPage() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userId } = useParams();
  const isEditMode = Boolean(userId);

  // Memoize `loadUser` to prevent it from being re-created on each render
  const loadUser = useCallback(async () => {
    try {
      const user = await getById(userId);
      console.log(user);
      reset(user);
    } catch (error) {
      console.error(error);
    }
  }, [userId, reset]);

  useEffect(() => {
    if (isEditMode) loadUser();
  }, [isEditMode, loadUser]); // Added dependencies

  const submit = (userData) => {
    updateUser(userData);
    toast.success("User Updated Successfully!");
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? "Edit User" : "Add User"} />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            label="Name"
            {...register("name", {
              required: true,
              minLength: 3,
            })}
            error={errors.name}
          />
          <Input
            label="Email"
            {...register("email", {
              required: true,
              pattern: EMAIL,
            })}
            error={errors.email}
          />
          <Input
            label="Address"
            {...register("address", {
              required: true,
              minLength: 5,
            })}
            error={errors.address}
          />
          <Input
            label="Is Admin"
            type="checkbox"
            {...register("isAdmin")}
          />
          <Button type="submit" />
        </form>
      </div>
    </div>
  );
}
