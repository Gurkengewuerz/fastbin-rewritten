# fastbin rewritten

Painless, self-hosted, modern alternative to [Hastebin](https://hastebin.com/).

## How to Use

Just paste your code or text, click save, and you're ready to go! You can also
select a programming language from the dropdown. You can click on the **Raw**
button to view only the contents, without any UI stuff.

fastbin uses [Monaco](https://microsoft.github.io/monaco-editor/) as its editor,
which is the editor used by Visual Studio Code. This offers great functionality
and syntax highlighting support.

You can also clone a document using the **Clone** button.

When viewing documents, the syntax highlighter works based on the ending of the
URL. For example, if I have a JavaScript file with the key "foobar", I can
append ".js" to the end of the URL and it will highlight it as JavaScript.
Appending .js to the raw URL will obviously not work, it expects only the key to
be provided.

Once you create a snippet, you will be given a link that you can use to delete
it from fastbin. This link will only ever be displayed ONCE, so make sure to
save it somewhere safe in case you want to delete your snippet later.

## fastbin cli

fastbin now has its own command line client. It's available for Linux, Mac OS,
Windows, and OpenBSD and you can download it using the link below:

https://github.com/jozsefsallai/fastbin-cli

## Compatibility with Haste clients

fastbin was designed to be compatible with most Hastebin clients. If your client
support specifying a custom server, you can specify your self-hosted fastbin URL
and it should work just fine.

## Duration

Currently, files are stored for an indefinite amout of time. This might change
in the future (possibly as a custom config option).

## Privacy

Please do NOT post any of your secret keys or passwords to a fastbin server.
Every URL is unlisted, but again, available for the public. Snippets are NOT
encrypted (i.e. they're plaintext). If there's popular demand for snippet
encryption, I'll make sure to include that.

## Storage Strategies

At the moment, fastbin can store snippets using three different strategies:
`file`, `s3`, `firebase`. You can specify which one you want to use by changing
the value of the `STORAGE_STRATEGY` environment variable inside of your `.env`
file from `file` to any of the ones mentioned earlier.

Some storage strategies require additional configuration.

### FileStorageStrategy

You can specify the location of the snippets using the `FILE_STORAGE_LOCATION`
environment variable. This path is relative to the root of the project.

### S3StorageStrategy

You need to specify the auth credentials, as well as the endpoint and the S3
bucket name using the `S3_*` environment variables.

### FirebaseStorageStrategy

You need to specify the name of the Firebase Storage bucket\* inside of the
`FIREBASE_BUCKET` property of the config. You should also include your Firebase
credentials certificate in `.firebase/credentials.json` (or as an environment
variable, using `FIREBASE_SERVICE_ACCOUNT`). This step is cruial. If you don't
have a credentials JSON file yet, you can generate one in the settings of your
Firebase projects.

\*Make sure you only specify the bucket's name, WITHOUT ".appspot.com".

## License

MIT.
