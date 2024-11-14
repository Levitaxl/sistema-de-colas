export const CheckboxOption = ({ label, value, isSelected, onCheckboxChange, classname2 }) => (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={value}
        name="reason"
        value={value}
        checked={isSelected === value}
        onChange={onCheckboxChange}
      />
      <label className= {classname2} htmlFor={value}><span className="color-white">{label}</span></label>
    </div>
  );