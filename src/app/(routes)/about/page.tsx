export default function AboutPage() {
  return (
    <article className="prose dark:prose-invert px-2">
      <section>
        <h2 className="mt-4">What?</h2>

        <p>
          This is a purposefully manual search engine. Users
          create links, and they bubble up through clicks,
          votes, and comments. And it&apos;s all made to be
          as transparent as possible, so much so that all of
          this project&apos;s code is open source, and you
          can examine it{" "}
          <a
            href="https://github.com/psygo/googol"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      </section>
    </article>
  )
}
