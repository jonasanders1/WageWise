const ColorSelector = ({ color, onChange, id }: { color: string; onChange: (value: string) => void; id: string; }) => {
  return (
    <div className="relative w-fit">
      <input 
        id={id}
        type="color" 
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      <div 
        className="h-12 w-12 rounded-full border-2 border-white cursor-pointer hover:opacity-90 transition-opacity"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

export default ColorSelector