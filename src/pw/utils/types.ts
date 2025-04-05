import { z } from 'zod';

const EmailSchema = z.string().email();
type Email = z.infer<typeof EmailSchema>;

export interface SliderPageFields {
  valueLocatorCss: string;
  draggerIndex: number;
  sliderIndex: number;
  errorMessageField:string
}

export  interface User {
  firstName: string;
  lastName: string;
  email: Email;
  website: string;
}

export type BasicUser =  Pick<User, 'firstName' | 'lastName'>

export type UserOptionalWebsite = Omit<User, 'website'> & Partial<Pick<User, 'website'>>
export type UserOptionalWebsite2 = Omit<User, 'website'> & { website?: string }

