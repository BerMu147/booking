import exp from "node:constants";

export interface User{
  uid: string;
  email: string;
  displayname?: string;
  role: UserRole;
  createdAt: Date;
  lastLogin?: Date;
}

export type UserRole = 'customer' | 'admin' | 'provider';

export interface TimeSlot{
  id: string;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  providerId: string;
  duration: number; //minutes
}

export interface Booking{
  id: string;
  slotId: string;
  userId: string;
  providerId:string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
  note?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface ApiResponse<T>{
  data: T;
  status: number;
  message?: string;
  timestamp: Date;
}

export interface ApiError{
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}
