const HOME_TEXTS = {
  title: <span>This is <b>chit-chat</b></span>,
  subtitle: <span>A place where you can talk <strong>anonymously about anything.</strong></span>,
  description: <span>First you must create or join a chat. You can type <em>help</em> to see how to get started.</span>
}

const HELP_COMMAND = (
  <span>
    <p>usage: &lt;command&gt; [&lt;args&gt;]</p>
    <br/>
    <p>Here are the commands to be used:</p>
    <br/>
    <pre>join-chat &lt;hash&gt; [-nickname &lt;name&gt;]  join a chat using the chat code</pre>
    <pre>create-chat [-nickname &lt;name&gt;]       create a chat</pre>
    <pre>set-nickname &lt;nickname&gt;              set the nickname used in the chat</pre>
    <pre>clear                                clear the terminal</pre>
  </span>
)

export { HOME_TEXTS, HELP_COMMAND }
