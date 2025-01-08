import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

export interface TimeSlot {
  id: string;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  providerId: string;
}

export interface Booking{
  id: string;
  slotId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})

export class BookingService{
  constructor() { }

  getAvailableSlots(date:Date): Observable<TimeSlot[]>{
    //firebase stuff
    return of ([])
  }

  createBooking(slotId: string): Observable<Booking>{
    //firebase stuff
    return of ({} as Booking)
  }

  cancelBooking(bookingId: string):Observable<void>{
    //firebase stuff
    return of (void 0);
  }
}
