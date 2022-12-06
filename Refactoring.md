# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I moved the constants outside the function, since they don't have to be recreated on each function
invocation. They are both configured as `const` variables with primitive values, so we know that they
won't be changed at runtime. I didn't add any `jsdoc` comments for them since their name is sufficient
to express their intent.

I added some `jsdoc` comments to explain the intent of the function and what its arguments
represent. This is sometimes hard to maintain so I try to keep it short. I found it very helpful when
working because they are picked up by most JavaScript tools and improve the development workflow.

I moved the argument validation to the top of the function, and added an immediate return for when
the event is `undefined`, empty (`''`), `null`, or `0`. The rest of the function can continue knowing
that the `event` is defined.

I removed the nested `if` statements to make the function easy to read (IMO), since you can follow
the logic from top to bottom without additional branches. The last two conditions I left as they
were since they are independent.

I didn't reduce or removed any other part because I think that it's intent is clear and its easy to
pick up what is doing, if anyone else (or me from the future) has to refactor it at any point in time.
