import clsx from "clsx"

const Hearth = ({ className }) => (
  <svg width="20" height="19" viewBox="0 0 20 19" className={clsx("fill-red-500 w-full h-auto", className)} xmlns="http://www.w3.org/2000/svg">
    <path d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z" />
  </svg>
)

const Diamond = ({ className }) => (
  <svg width="14" height="20" viewBox="0 0 14 20" className={clsx("fill-red-500 w-full h-auto", className)} xmlns="http://www.w3.org/2000/svg">
    <path d="M14 10L7 20L0 10L7 0" />
  </svg>
)

const Clubs = ({ className }) => (
  <svg width="19" height="21" viewBox="0 0 19 21" className={clsx("fill-black w-full h-auto", className)} xmlns="http://www.w3.org/2000/svg">
    <path d="M9.2583 0.966797C11.5583 0.966797 13.5583 2.9668 13.5583 5.1668C13.4683 7.7368 11.5983 8.7968 11.2983 8.9668C12.2983 8.4668 13.7583 8.4668 13.7583 8.4668C16.2583 8.4668 18.2583 10.2668 18.2583 12.7668C18.2583 15.2668 16.2583 16.9668 13.7583 16.9668C13.7583 16.9668 12.2583 16.9668 10.2583 15.9668C10.2583 15.9668 9.9583 17.9668 12.2583 20.9668H6.2583C8.5583 17.9668 8.2583 15.9668 8.2583 15.9668C6.2583 16.9668 4.7583 16.9668 4.7583 16.9668C2.2583 16.9668 0.258301 15.2668 0.258301 12.7668C0.258301 10.2668 2.2583 8.4668 4.7583 8.4668C4.7583 8.4668 6.2183 8.4668 7.2183 8.9668C6.9183 8.7968 5.0483 7.7368 4.9583 5.1668C4.9583 2.9668 6.9583 0.966797 9.2583 0.966797Z" />
  </svg>
)

const Spade = ({ className }) => (
  <svg width="16" height="20" viewBox="0 0 16 20" className={clsx("fill-black w-full h-auto", className)} xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C5 5 0 7 0 12C0 14 2 16 4 16C5 16 6 16 7 15C7 15 7.32 17 5 20H11C9 17 9 15 9 15C10 16 11 16 12 16C14 16 16 14 16 12C16 7 11 5 8 0Z" />
  </svg>
)

const CardFace = ({ card, cardClick }) => (
  <div className="bg-[#fafafa] w-12 h-20" onClick={cardClick} >

    {card.template.length === 5 ? (
      <div className="grid grid-rows-5 grid-cols-3 gap-0.5 h-full w-full p-3 py-2">
        {
          card.template.map((row, rowIndex) => (
            row.map((cell, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className="w-full h-full flex justify-center items-center"

              >
                {cell && (
                  <div className={clsx("w-full h-full", cell > Math.ceil(card.value / 2) && "rotate-180")}>
                    {card.suit === "diamonds" && <Diamond />}
                    {card.suit === "hearts" && <Hearth />}
                    {card.suit === "clubs" && <Clubs />}
                    {card.suit === "spades" && <Spade />}
                  </div>
                )}

              </div>
            ))
          ))
        }
      </div>
    ) : (
      <div className="h-full w-full p-3 py-2">
        <p className={clsx("text-3xl font-bold h-full flex justify-center items-center", ((card.suit === "diamonds") || (card.suit === "hearts")) && "text-red-500")}>
          {card.template}
        </p>
      </div>
    )}
    <div className={clsx("absolute text-[5px] right-1 top-0.5  flex flex-col justify-center items-center", ((card.suit === "diamonds") || (card.suit === "hearts")) && "text-red-500")}>
      <p>{card.name}</p>
      {card.suit === "diamonds" && <Diamond className="!w-1" />}
      {card.suit === "hearts" && <Hearth className="!w-1" />}
      {card.suit === "clubs" && <Clubs className="!w-1" />}
      {card.suit === "spades" && <Spade className="!w-1" />}
    </div>
    <div className={clsx("absolute text-[5px] left-1 bottom-0.5 flex flex-col justify-center items-center rotate-180", ((card.suit === "diamonds") || (card.suit === "hearts")) && "text-red-500")}>
      <p>{card.name}</p>
      {card.suit === "diamonds" && <Diamond className="!w-1" />}
      {card.suit === "hearts" && <Hearth className="!w-1" />}
      {card.suit === "clubs" && <Clubs className="!w-1" />}
      {card.suit === "spades" && <Spade className="!w-1" />}
    </div>
  </div >
)

export default CardFace
