---
description: About nagivation
---

# React Route-Dom

#### reference: [https://reactrouter.com/api/components/Navigate#signature](https://reactrouter.com/api/components/Navigate#signature)

## Function Navigate

A component-based version of [useNavigate](https://api.reactrouter.com/v8/functions/react-router.useNavigate.html) to use in a [`React.Component` class](https://react.dev/reference/react/Component) where hooks cannot be used.

```typescript
<Navigate to="/tasks" />
```

#### **Signature**

`function Navigate({ to, replace, state, relative }: NavigateProps): null`

* to : The path to navigate to. This can be a string or a [`Path`](https://api.reactrouter.com/v8/interfaces/react-router.Path.html) object
* State to pass to the new [`Location`](https://api.reactrouter.com/v8/interfaces/react-router.Location.html) to store in [`history.state`](https://developer.mozilla.org/en-US/docs/Web/API/History/state)
* replace the current entry in the [`History`](https://developer.mozilla.org/en-US/docs/Web/API/History) stack
* relative : method to interpret relative routing in the `to` prop. See
