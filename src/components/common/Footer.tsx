import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faQuestion } from "@fortawesome/free-solid-svg-icons"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="flex items-center justify-center gap-3 bg-gray-200 p-4 dark:bg-gray-900">
      <a
        className="h-6 w-6"
        href="https://github.com/psygo/googol"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          className="h-6 w-6"
          color="gray"
          icon={faGithub}
        />
      </a>
      <Link className="h-6 w-6" href="/about">
        <FontAwesomeIcon
          className="h-6 w-6"
          color="gray"
          icon={faQuestion}
        />
      </Link>
    </footer>
  )
}
