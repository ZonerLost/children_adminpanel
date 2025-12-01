interface AvatarProps {
  initials?: string;
  src?: string;
}

const Avatar = ({ initials = "AR", src }: AvatarProps) => {
  if (src) {
    return (
      <img
        src={src}
        alt="avatar"
        className="h-9 w-9 rounded-full object-cover border border-white/40"
      />
    );
  }
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white text-xs font-semibold text-slate-900">
      {initials}
    </div>
  );
};

export default Avatar;
