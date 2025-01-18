import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const registerSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
      message:
        'Password must contain 8 characters, with 1 uppercase, and 1 number',
    }),
  name: z.string().min(1, { message: 'Name is required' }),
});

// .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {message: 'Password must contain'})

export const settingsSchema = z
  .object({
    name: z.optional(z.string().min(1)),
    username: z.optional(
      z.string().min(1, { message: 'Username is required' })
    ),
    password: z.optional(
      z
        .string()
        .min(8)
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
          message:
            'Password must contain 8 characters, with 1 uppercase, and 1 number',
        })
    ),
    newPassword: z.optional(
      z
        .string()
        .min(8)
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
          message:
            'Password must contain 8 characters, with 1 uppercase, and 1 number',
        })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: 'New password is required!',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: 'Password is required!',
      path: ['password'],
    }
  );
