import { differenceInCalendarDays } from "date-fns";
import {useContext, useEffect, useState} from "react";

export default function BookingWidget({place}) {
  const [checkin,setCheckin] = useState('');
  const [checkout,setCheckout] = useState('');
  const [numberOfGuests,setNumberOfGuests] = useState(1);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');

  let numberOfNights = 0;
  if (checkin && checkout) {
    numberOfNights =differenceInCalendarDays(new Date(checkout),new Date(checkin))
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input type="date"
                   value={checkin}
                   onChange={ev => setCheckin(ev.target.value)}/>
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input type="date" value={checkout}
                   onChange={ev => setCheckout(ev.target.value)}/>
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input type="number"
                 value={numberOfGuests}
                 onChange={ev => setNumberOfGuests(ev.target.value)}/>
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text"
                   value={name}
                   onChange={ev => setName(ev.target.value)}/>
            <label>Phone number:</label>
            <input type="tel"
                   value={phone}
                   onChange={ev => setPhone(ev.target.value)}/>
          </div>
        )}
    </div>
    <button className="primary mt-4">
        Book this place
        {numberOfNights && (
            <span>${numberOfNights * place.price}</span>
        )}
    </button>
    </div>
  );
}