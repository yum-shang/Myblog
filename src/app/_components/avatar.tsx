type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <img
        src={picture}
        className="w-10 h-10 rounded-full mr-3 ring-2 ring-morandi-sage-wash"
        alt={name}
      />
      <div className="text-sm font-medium text-morandi-ink-light">{name}</div>
    </div>
  );
};

export default Avatar;
