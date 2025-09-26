import "./Button_sec.css";

function Button_sec({
  OnPress,
  title,
}: {
  OnPress: () => void;
  title: String;
}) {
  return (
    <button onClick={OnPress} className="button-sec" id="btn">
      {title}
    </button>
  );
}

export default Button_sec;
