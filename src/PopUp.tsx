import Button_sec from "./Button_sec"
import "./popup.css"

function PopUp({input, setInput, onPress}: {
    input: string,
    setInput: (val: string) => void,
    onPress: () => void
}) {
  return (
    <div className='popup'>
        <div className="popup-content">
            <h1>Enter The Password</h1>
            <input type="password" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Password Hint - Britannia"/>
            <div className="align">
            <Button_sec
            title={"Submit"}
            OnPress={onPress}
            />
            </div>
        </div>
    </div>
  )
}

export default PopUp