export default function AboutPage() {
  return (
    <article className="prose px-2 dark:prose-invert">
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

      <section>
        <h2>Why?</h2>

        <p>
          Just the transparency alone justifies this
          project&apos;s existence to me, especially after
          AI hype started obfuscating real content on the
          web even more.
        </p>
        <p>
          And having an alternative search engine, one
          that&apos;s 100% human, serves another, useful
          prism to web.
        </p>
        <p>
          It&apos;s worth mentioning though, that this
          project is not against AI itself, it&apos;s just
          against its overuse. It would even be useful to
          add some AI features to this project, such as
          recommendationss, but only if the user is able to
          easily deactivate it.
        </p>
      </section>
    </article>
  )
}
