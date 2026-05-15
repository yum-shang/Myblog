import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className="tracking-wide">
      {format(date, "yyyy / MM / dd")}
    </time>
  );
};

export default DateFormatter;
