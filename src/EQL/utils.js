export async function needsBroadcast(EQLResult) {
  console.log(EQLResult);
  return (
        typeof EQLResult === "object"
    &&  "broadcast" in EQLResult
    &&  !!EQLResult.broadcast
  )
}