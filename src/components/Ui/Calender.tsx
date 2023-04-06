// code taken from https://css-tricks.com/how-to-make-a-monthly-calendar-with-real-data/ and customized for react and tailwind

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useState } from 'react';

interface Calendar {
  year: string | number;
  month: string | number;
}

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const INITIAL_YEAR = dayjs().format('YYYY');
const INITIAL_MONTH = dayjs().format('M');
const TODAY = dayjs().format('YYYY-MM-DD');
var selectedMonth = dayjs(
  new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1).toString()
);
var currentMonthDays = createDaysForCurrentMonth(INITIAL_YEAR, INITIAL_MONTH);
var previousMonthDays = createDaysForPreviousMonth(
  INITIAL_YEAR,
  INITIAL_MONTH,
  currentMonthDays[0]
);
var nextMonthDays = createDaysForNextMonth(INITIAL_YEAR, INITIAL_MONTH);

function getNumberOfDaysInMonth(year: string | number, month: string | number) {
  return dayjs(`${year}-${month}-01`).daysInMonth();
}
function getWeekday(date: string) {
  return dayjs(date).weekday();
}

function createDaysForCurrentMonth(
  year: string | number,
  month: string | number
) {
  return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
    return {
      date: dayjs(`${year}-${month}-${index + 1}`).format('YYYY-MM-DD'),
      dayOfMonth: index + 1,
      isCurrentMonth: true,
      // isLeave: check inside leaveDates prop array
    };
  });
}

function createDaysForPreviousMonth(
  year: string | number,
  month: string | number
) {
  const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);
  const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, 'month');
  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
    ? firstDayOfTheMonthWeekday - 1
    : 6;
  const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
    .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
    .date();
  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
    return {
      date: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + index
        }`
      ).format('YYYY-MM-DD'),
      dayOfMonth: previousMonthLastMondayDayOfMonth + index,
      isCurrentMonth: false,
    };
  });
}

function createDaysForNextMonth(year: string | number, month: string | number) {
  const lastDayOfTheMonthWeekday = getWeekday(
    `${year}-${month}-${currentMonthDays.length}`
  );
  const nextMonth = dayjs(`${year}-${month}-01`).add(1, 'month');
  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
    ? 7 - lastDayOfTheMonthWeekday
    : lastDayOfTheMonthWeekday;
  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      date: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format('YYYY-MM-DD'),
      dayOfMonth: index + 1,
      isCurrentMonth: false,
    };
  });
}

interface Props {
  yearlyLeaves: string;
  setSelectedDate: (v: string) => void;
  setShowCalendar: (v: boolean) => void;
}

const Calendar = ({
  yearlyLeaves,
  setSelectedDate,
  setShowCalendar,
}: Props) => {
  const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [currentYear, setCurrentYear] = useState<number | string | undefined>(
    INITIAL_YEAR
  );
  const [currentMonth, setCurrentMonth] = useState<number | string | undefined>(
    INITIAL_MONTH
  );

  const [days, setDays] = useState([
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ]);

  const updateDays = () => {
    currentMonthDays = createDaysForCurrentMonth(
      selectedMonth.format('YYYY'),
      selectedMonth.format('M')
    );
    previousMonthDays = createDaysForPreviousMonth(
      selectedMonth.format('YYYY'),
      selectedMonth.format('M'),
      currentMonthDays[0]
    );
    nextMonthDays = createDaysForNextMonth(
      selectedMonth.format('YYYY'),
      selectedMonth.format('M')
    );
    setDays([...previousMonthDays, ...currentMonthDays, ...nextMonthDays]);
  };

  const updateMonth = (action: string) => {
    if (action === 'increment') {
      if (
        dayjs(selectedMonth).add(1, 'month').format('YYYY') > dayjs().year()
      ) {
        return;
      }
      selectedMonth = dayjs(selectedMonth).add(1, 'month');
    } else if (action === 'decrement') {
      if (
        dayjs(selectedMonth).subtract(1, 'month').format('YYYY') <
        dayjs().year()
      ) {
        return;
      }
      selectedMonth = dayjs(selectedMonth).subtract(1, 'month');
    } else {
      selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
    }
    setCurrentYear(selectedMonth.format('YYYY'));
    setCurrentMonth(selectedMonth.format('M'));
    updateDays();
  };
  const renderDays = () => {
    return days.map((day, index) => {
      var bgColor;
      if (!day.isCurrentMonth) {
        bgColor = 'bg-grey-100';
      } else if (
        yearlyLeaves.includes(
          day.date
        ) /* replace with a faster searching technique like binary tree or something */
      ) {
        bgColor = 'bg-red-100';
      } else {
        bgColor = 'bg-[#3B3B3B]/60';
      }
      return (
        <li
          key={index}
          className={`relative min-h-[40px] ${bgColor} p-1 text-sm text-white/70`}
        >
          <span
            onClick={(e) => {
              setSelectedDate(day.date);
              setShowCalendar(false);
            }}
            className={`absolute right-[2px] flex h-5 w-5 items-center justify-center ${
              day.date === TODAY
                ? 'rounded-full bg-primary text-red-800 font-bold'
                : ''
            }`}
          >
            {day.dayOfMonth}
          </span>
        </li>
      );
    });
  };

  return (
    //  parent div
    <div className="relative bg-[#3B3B3B]/90 text-white text-sm rounded-lg">
      {/* header section */}
      <section className="flex justify-between bg-[#3B3B3B]/20 p-3">
        {/* Month Name */}
        <div className="text-sm lg:text-lg font-semibold text-primary">
          {dayjs(new Date(currentYear, currentMonth - 1)).format('MMMM YYYY')}
        </div>
        {/* Pagination Menu */}
        <div className="mr-6 flex w-20 items-center justify-between">
          <span
            className="scale-150 cursor-pointer"
            onClick={() => updateMonth('decrement')}
          >
            &#8592;
          </span>
          <span
            className="mx-3 cursor-pointer"
            onClick={() => updateMonth('currentMonth')}
          >
            Today
          </span>
          <span
            className="scale-150 cursor-pointer"
            onClick={() => updateMonth('increment')}
          >
            &rarr;
          </span>
        </div>
      </section>
      {/* Days of the week header */}
      <ol className="grid grid-cols-7 bg-[#3B3B3B]/40 pb-1  text-sm lg:text-lg text-white/40">
        {WEEKDAYS.map((weekday, index) => (
          <li key={index} className="pr-1 text-right">
            {weekday}
          </li>
        ))}
      </ol>
      {/* Calendar grid */}
      <ol className="relative grid h-full grid-cols-7 gap-[1px] border-t-2 border-[#3B3B3B]/30">
        {renderDays()}
      </ol>
    </div>
  );
};

export default Calendar;
