export default function Language() {
  return (
    <div className="w-[300px] mx-auto my-[100px] text-center">
      <div className="inline-block">
        <span>Sprache:</span>
        <ul className="list-none p-0 m-0 relative inline-block">
          <li className="cursor-pointer pb-[10px] relative group">
            <b>Deutsch</b>
            <i className="fa fa-angle-down" aria-hidden="true"></i>
            <div className="absolute top-[15px] right-[-10px] z-[10] h-[14px] overflow-hidden w-[30px] bg-transparent group-hover:block hidden">
              <div className="absolute top-[-7px] right-[-5px] z-[20] w-[15px] h-[15px] bg-white rotate-[45deg] translate-y-[0px] translate-x-[10px] rounded-tl-md shadow-lg"></div>
            </div>
            <ul className="list-none p-0 m-0 hidden group-hover:block absolute top-[29px] right-[-15px] bg-white w-[120px] py-0 rounded-md shadow-lg">
              <li className="relative text-left bg-transparent p-[15px] pb-0 z-[2] text-[15px] text-[#3c3c3c] hover:text-[#146c78]">
                <i className="inline-block w-[15px] h-[15px] bg-[#aaa] rounded-full shadow-sm relative top-[2px] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTM0A1t6AAAAPUlEQVQ4T+3HMQ0AIBTE0NOHM8x9B7hgh71bIWGieUvze1m7kHGBr/AVvsJX+EpmP5dV5/gKX+ErfIUvVDYcX2NMxQC8PAAAAABJRU5ErkJggg==') bg-cover bg-center"></i>
                <span className="pl-[5px]">Deutsch</span>
              </li>
              <li className="relative text-left bg-transparent p-[15px] pb-[15px] z-[2] text-[15px] text-[#3c3c3c] hover:text-[#146c78]">
                <i className="inline-block w-[15px] h-[15px] bg-[#aaa] rounded-full shadow-sm relative top-[2px] bg-[url('/eng.jpg') bg-cover bg-center"></i>
                <span className="">Englisch</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
