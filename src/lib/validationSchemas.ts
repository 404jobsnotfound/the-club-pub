import * as Yup from 'yup';

export const NewUserSchema = Yup.object({
  credentials: Yup.object({
    email: Yup.string().email('Invalid email').required(),
    password: Yup.string().required(),
  }),
  user: Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email('Invalid email').required(),
  }),
});

export const EditUserSchema = Yup.object({
  id: Yup.number().required(),
  email: Yup.string().email('Invalid email').required(),
  role: Yup.mixed().oneOf(['USER', 'CLUB_OWNER', 'ADMIN'], 'Invalid role'),
});

export const AddClubSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  meetingTime: Yup.string().required(),
  meetingLocation: Yup.string().required(),
  interestAreas: Yup.string().required(),
  image: Yup.string().required(),
  admins: Yup.string().required(),
});

export const EditClubSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  meetingTime: Yup.string().required(),
  meetingLocation: Yup.string().required(),
  interestAreas: Yup.string().required(),
  image: Yup.string().required(),
  admins: Yup.string().required(),
});
