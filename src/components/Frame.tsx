export default function Frame({ size = 20 }: { size?: number }) {
  return (
    <>
      <img
        src="/tl.png"
        className={`absolute top-${size} left-${size} w-20 object-contain z-30`}
        alt=""
      />
      <img
        src="/tr.png"
        className={`absolute top-${size} right-${size} w-20 object-contain z-30`}
        alt=""
      />
      <img
        src="/bl.png"
        className={`absolute bottom-${size} left-${size} w-20 object-contain z-30`}
        alt=""
      />
      <img
        src="/br.png"
        className={`absolute bottom-${size} right-${size} w-20 object-contain z-30`}
        alt=""
      />
    </>
  )
}
