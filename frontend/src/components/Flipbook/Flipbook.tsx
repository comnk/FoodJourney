import HTMLFlipBook from "react-pageflip";
import "./Flipbook.scss";

const entries = [
  {
    date: "March 3rd, 1924",
    location: "Lyon, France",
    title: "Quenelles at Mère Brazier",
    rating: "✦ ✦ ✦ ✦ ✦",
    body: `The quenelles arrived as pale, cloud-like ovals barely trembling in their dish — the crayfish bisque poured tableside, perfuming the whole room. One forgets, in lesser cities, that a sauce can be the point of an entire meal. Mère Brazier said nothing, only watched from the doorway. She knew.`,
    tags: ["French", "Lyon", "Lunch"],
    imageCaption: "Quenelles de brochet, sauce Nantua — Mère Brazier, Lyon",
  },
  {
    date: "March 11th, 1924",
    location: "Naples, Italy",
    title: "Pizza at Port'Alba",
    rating: "✦ ✦ ✦ ✦ ✦",
    body: `The oldest pizzeria in the world and they wear the distinction lightly. Dough blistered and blackened at the crust's edge, pooling San Marzano in the center like a small volcanic crater. I ate standing. I ate two. The third I carried into the street, drawing looks of approval from strangers who understood entirely.`,
    tags: ["Italian", "Naples", "Street food"],
    imageCaption: "Margherita verace — Port'Alba, Via Port'Alba, Naples",
  },
  {
    date: "April 2nd, 1924",
    location: "Osaka, Japan",
    title: "Ramen at dawn",
    rating: "✦ ✦ ✦ ✦",
    body: `Found the shop by following a fisherman who looked like he knew where he was going. Twelve seats, a curtain, no menu — the bowl arrived without ceremony. The broth had been cooking since before I was born, or so it seemed. Chashu pork arranged like a benediction. I did not speak. Neither did anyone else.`,
    tags: ["Japanese", "Osaka", "Breakfast"],
    imageCaption: "Tonkotsu ramen, unnamed shop — Dotonbori district, Osaka",
  },
  {
    date: "April 19th, 1924",
    location: "Marrakech, Morocco",
    title: "Lamb Tagine in the Medina",
    rating: "✦ ✦ ✦ ✦ ✦",
    body: `Taken in by a family who mistook my lost expression for an invitation, which perhaps it was. The tagine came to the table still singing, its lid lifted to release a plume of ras el hanout and preserved lemon. We ate from the same dish with bread torn by hand. Outside, the call to prayer. Inside, a silence that felt like gratitude.`,
    tags: ["Moroccan", "Marrakech", "Dinner"],
    imageCaption: "Lamb & apricot tagine — private home, Medina, Marrakech",
  },
  {
    date: "May 7th, 1924",
    location: "New Orleans, USA",
    title: "Gumbo at a backstreet counter",
    rating: "✦ ✦ ✦ ✦ ✦",
    body: `No sign above the door, only a chalkboard listing two items. I chose the gumbo. The roux was the color of dark mahogany, built with a patience I can only imagine — forty minutes of stirring, they said, without stopping. Andouille, crab, okra. Rice piled in the center like a small island. I asked for the recipe. She laughed for a long time.`,
    tags: ["Creole", "New Orleans", "Lunch"],
    imageCaption:
      "Seafood gumbo with andouille — unnamed counter, Tremé, New Orleans",
  },
  {
    date: "May 22nd, 1924",
    location: "Istanbul, Turkey",
    title: "Breakfast at the Bosphorus",
    rating: "✦ ✦ ✦ ✦ ✦",
    body: `Twelve small dishes arrived before I had finished my first glass of tea: white cheese, black olives, clotted cream with honey, sliced cucumber, soft-boiled eggs still warm from the pot, a tomato salad dressed with nothing but time. The bread came hot. The water was cold and still. The strait glittered below. I did not move from that table for two hours.`,
    tags: ["Turkish", "Istanbul", "Breakfast"],
    imageCaption:
      "Turkish kahvaltı spread — terrace overlooking the Bosphorus, Istanbul",
  },
];

export default function Flipbook() {
  return (
    <div className="book-wrapper">
      <div className="book-title-plate">
        <div className="book-title-ornament-row">
          <span className="ornament-line" />
          <span className="ornament-glyph">✾</span>
          <span className="ornament-line" />
        </div>
        <h1 className="book-title">A Gastronomic Journal</h1>
        <p className="book-subtitle">Meals Worth Remembering &middot; 1924</p>
        <div className="book-title-ornament-row">
          <span className="ornament-line" />
          <span className="ornament-glyph">✾</span>
          <span className="ornament-line" />
        </div>
      </div>

      <HTMLFlipBook
        className="my-book"
        drawShadow={true}
        showCover={false}
        flippingTime={700}
        width={340}
        height={520}
        minWidth={300}
        minHeight={460}
        maxWidth={500}
        maxHeight={600}
        size="fixed"
        style={{}}
        startPage={0}
        usePortrait={true}
        autoSize={true}
        startZIndex={23}
        maxShadowOpacity={0.45}
        mobileScrollSupport={true}
        onFlip={(e) => console.log("Current page: " + e.data)}
        onChangeOrientation={(e) =>
          console.log("Current orientation: " + e.data)
        }
        clickEventForward={true}
        swipeDistance={30}
        useMouseEvents={true}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        {entries.map((entry, i) => {
          const pageNum = i * 2;
          return [
            /* ODD PAGE — Image placeholder */
            <div key={`img-${i}`} className="demoPage demoPage--image">
              <div className="page-inner">
                <div className="entry-datestamp">
                  <span className="datestamp-location">{entry.location}</span>
                  <span className="datestamp-divider"> · </span>
                  <span className="datestamp-date">{entry.date}</span>
                </div>

                <div className="image-placeholder">
                  <div className="image-placeholder__frame">
                    <div className="image-placeholder__inner">
                      <div className="image-placeholder__icon">⬡</div>
                      <p className="image-placeholder__label">Photograph</p>
                      <p className="image-placeholder__caption">
                        {entry.imageCaption}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="tag-row">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="page-number page-number--left">
                  {pageNum + 1}
                </div>
              </div>
            </div>,

            /* EVEN PAGE — Text */
            <div key={`txt-${i}`} className="demoPage demoPage--text">
              <div className="page-inner">
                <div className="chapter-header">
                  <div className="chapter-rule" />
                  <h2 className="entry-title">{entry.title}</h2>
                  <p className="entry-rating">{entry.rating}</p>
                  <div className="chapter-rule chapter-rule--thin" />
                </div>

                <p className="chapter-body">{entry.body}</p>

                <div className="entry-footer">
                  <div className="footer-rule" />
                  <p className="entry-footer-note">
                    — {entry.location}, {entry.date}
                  </p>
                </div>

                <div className="page-number page-number--right">
                  {pageNum + 2}
                </div>
              </div>
            </div>,
          ];
        })}
      </HTMLFlipBook>

      <p className="flip-hint">← Click the page edge or swipe to turn →</p>
    </div>
  );
}
