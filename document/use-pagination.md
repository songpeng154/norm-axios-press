# usePagination

`usePagination` 是基于 [useRequest](/document/use-request/introduction.md) 实现的分页请求 `hook`
，可以自动化管理分页信息，并且支持[useRequest](/document/use-request/introduction.md)的全部功能。

::: warning 注意
[service](/api-reference/hooks/use-pagination/pagination-service-fn.md)
返回数据必须符合 [PaginationResponse](/api-reference/hooks/use-pagination/pagination-response.md)
分页规范（字段名称必须有:`list`、`total`）。若服务数据格式不兼容，开发者需要封装格式转换函数，或在响应拦截器中强制规范数据格式。
:::

```vue
<script setup lang="ts">
  import { usePagination } from 'norm-axios'

  const { list, data, page, pageSize } = usePagination(getList)
</script>
```

## 基础用法

* `page`变化时会自动请求数据，可以通过设置 `pageWatch: false` 来关闭该功能
* `pageSize` 变化时会自动重置分页,可以通过设置 `resetPageOnPageSizeChange: false` 来关闭该功能

::: warning 注意
当 `pageWatch` 与 [watchSource](/api-reference/hooks/use-request/request-options.md#watchsource) 同时设置为 `true` 后，
`page` 或者 `pageSize`变化的时候会调用两遍服务，这个问题可以设置 `pageWatch` 或者 `watchSource`来解决
:::

::: demo
use-pagination/base
https://play.vuejs.org/#eNqVV22PE0Uc/ypj1dBKu20FYlJ7DYiY6Aslgq8okW132htud3YzM9u7s2kCRgQhByb48AZzEkPkjYYXCqcE+TK39e5b8JuZbnf3rnfAi2s7/4ff/P4P85+5celUFDmjmJZapbbsCxYpIqmKI+K7fLjULSnZLXW6nAVRKBRR6xElY3LWHTLuKhbyz6mMQi5plaS/TodcUa7IhAxEGJAjPBRBzV1joTwyhxmTWNIMZLEtrIEkBm6fki8kFWTc5YRwN6AtIpVgfKjX7hBLHgc9KszS8wSVMm+hmPZITSYauA+iirhynfdPrbpMkSW7IOWA+T6TFAZe6lMhSx3C6So5C47QlbFB6I+oFiNV5wEfxiqVVkkOolLRu9XrZOf2k+TOT8nV69MfH003/kwZDKn6yF2hH7rKzSiMSYSgqubzHPuKkkkLCdOrlFGmSyVkUmml/Np7KtHeX622zmen09EhmKxaOipUrg8iJxqadipFMKplKnDhIpSnhHDXHV0vMPUpH6rlVo5rlZS/rBJmkmagUxjmwbmsDUmNNCvknczpKGH4a1prge4TPPVNC37p/x8eTm88IW+NmTe5VE2VJinvNuBdBv7bpNmoZLq0FS4lm7eTra/3+tq+QO6pw8PVckXT8ECr2Wg0ZkZoFnxUnAHz0YnlLLKD42jbLFYIqr579XlybWPn8bXk+r9WbPPqmp7L2q98rNEwDtOH96e3Nqe3HyR3fkuePt55vmkdZjm5YFnNU6Mrk4Wj8VPes++Ye3TAOPXM+mKh+1E87U780PVwUmxPZZ1VnQHaL7QQaosCFs5tOde/ptMtciToiIWxNE6oedYLbGAz54xcP4ZuaUln0Ean9TldDSrD12JyuqYW48355UAznAPQjxbR0SoawRQRG+BMFQ6/2StNTIYAi0JG/XCVitfFQZwpTrtuBzDGLRaKBpGP5sSKkLbHRuYHfiq351upXS5T15svtUDkVsagk/x+N/l+o13Hz32qf/7a/e+bxap7j5JfrixUTX9+ML23uUeFZba11uWJtVUv9NbJqMYGuFXemHWduVtyzKEfhAIGZYb4cdrQwGsVfJlm7ZZIa4WuQ23kBWft7nXGY6IdHT00yGQCEvnUFG1MS7/ExI6Ql5npSbLfZm86dPz700F9mRVzUfU8zE9fRi5H2Mf3hExIcvPXnWfPtrf+cByn4PfKXLDKNVQ76iTP7ibfbSQ3vt29/3cLIZpRN5lgr5wC99ju9Tup2o5+mEyvPIVGi+1dYtysQ1FjBwpSFqUb92Kl8BQ42fdZfwWx5qdILuztrZvbW1cAmLK3fgehpHOjgHDrdRBys6GM6yUHlM8EOdrEpfkqeIUpcRhibSFiu25HAcqWDQgspVr3KSGyH0ZUV362rRk5Pbe/MhQhboMWefMEfc+lvfft/e6HokVWl9HFRtALhUch4SG3ggjR45i2yIlojTTxkTOrCRzhGPfr8Zk4cAVuhppgw2U8GJoNI7ZzTZMDqVK1ZF+AtcCNnMsy5Hh2Goo40kaB1yZeOzZuVG/+HtTibmlZqUi26vWYRytDpx8G9czipM6FVHUqg7oZD8DvlmYXIcp4GEoBwMOksRInYNygmGcAYgF/hQzzARvuYQ+UiPlUfBbpi7EYheuj5p8YmRIxnVPqL9P+ygL5ZYnRpomexfChYoTmnesUckwxCLX6zLlP0d05ZRB6sQ/rQ5R4AYZ+rDlasw/QFKCdT5Rm+7EpBip/Xp5ZwyNSpkFpoiYbxr5bwn8Opw8JPaN7zDk+z+LkBRlWO0o=
:::

## 追加模式

追加模式是指在请求数据时，自动将新请求的数据追加到已有列表中，例如第一次请求返回 `[1, 2, 3]`，第二次返回 `[4, 5, 6]`
，最终列表将合并为 `[1, 2, 3, 4, 5, 6]`。该功能常用于「加载更多」场景。

通过设置 `addedMode: true` 来开启该功能。

::: demo
use-pagination/added-mode
https://play.vuejs.org/#eNp9VlGP20QQ/isj89CExvGd2grJJFGPUiSQCifaN4zQxt5ztrF3V7vrXEJkCV5ailT6gOABeKASzwghEBLo/g2J2n/R2V07ca7VnXSJd2b22++bmR1nHZxIOVxUNIiDkU4VkwY0NZWEgvB8nARGJ8Ek4ayUQhkwK0lhDackZ5wYJvinVEvBNR1A+3RHcEO5gRrOlCjhGheqDMmSCX1tB7OGStM9yJtjE54ingGiVzw9OSfMwNgvoFeyomCaYkAWA6/KKVV9GE+A03M4RSj09RTVolhQa0ZFD1hJRWVa6wA6EP2+PS2K4MV3/2ye/bj5+vH2hz+2T39vGeTUfEDm9H1iyJ7CGiTJEcd+3mdfUqhj1GVXLaO9r7VA3Y9bfqNLCRu9ntSR3zWZTKyIdcIBPCEjDCmQyq2jvU0bgpkdQ88eCiEc9+HtHYF9GOUZBt0jZjYsGe/5Xdd3gQOPjQlpN2CSLOyJUmQ1tGVC5QXluZnFDixsTq4H0PtiAMzVoYVl+H/swIgr4L6WvRtHR86hsNsUh8/sM3iR9s8eO2gXjlOzqpvvimf0jHGaufXnCa/3LYMM7fZLFWq0NV+YbqwZKjtoxV6n1gPPhmQZze6JDKtoVEXxuBqJjyJ/W/Bu4MLQUhbEUFwBjDK2cA/+EdKCaI1XCbkZgoyVu1Fe2UjCIjwTCt0MQYBxRz0JIJ7TVWPtxGOG1uAia9TbYETyEI+d4UYLM/SFgvF47EUfIG3/fL795cn25782v/30/7+PXocbRR0lcrK5+H7z5Onmm0cvn/8dIw3XaHUN0HXgzXn5+Fnr9hcDQ7Zf/Ycea/a967b5DYceX5a6Q2JaGYMz4nZasHSOwtyx18dw3BGz+fbXFxcXXkrL3e/zFWmEjKJOoXCpzaqgoFMhaYaW5iRX9SlJ57kS2GUxvHWLvkPo9F1/KQqhYjifYRGcYSpURtHCBfcGiQ3DeB7DLbmEY/zohIWKZKzSMdxszCVR2HqhYvnMxHB85MxY2eGuWRybjGmkvYphWoh0jiHuoOayGLo0ISlYzmNIcZJQ5aB3Z04FyioRHfng8GMZLIjqheFChmmIiWEY1G+2eD4xHDXrnZiGGt4/xw/b3+YOkxYMAj/Vw5LI4UMtOL5KHDNsXufANwiORo+XBPsZb81JMDNG6jiKKi7nOcouo33EbVsqbSKqy4jhfV8ifhI0AyAJrkQ5AMD8GW+xU8+htFqQv8EO4Gcsv8QeUSQrqPpE2slwqIIUhTj/yNmaoeDt6Yym8zfYH+qlJ3qKLyCqFrQjA2clTh3vvnv/Y6xmx1mKrCow+gonvi5EUVmOPuw9bFqk3U2UZfuhKwYW84G+u8Q3jm5FWaIuGy4+CfDXwJ0rpO/p3hje3GWxfgVXbuLn
:::

## 滚动到底部自动加载
`usePagination` 还支持滚动到底部自动加载数据的功能，避免了手动点击加载更多的麻烦。

通过设置 `target` 属性为父级容器，在容器滚动到底部时，分页自动`+1`,然后加载数据。

避免重复触发，请求期间不会触发滚动到底部的事件。


::: demo
use-pagination/target
https://play.vuejs.org/#eNqFVU+P20QU/ypP7mETiONdbVdIJolYSpFAKqzavWGEJvbEmcaesWbG2YTIElxaeig9IDgAl0qcEUIgJBDfhkT0W/TNjB0722q70iaZ9+c3v/d7b2Y23nlRDJcl9UJvpGLJCg2K6rKAjPB0HHlaRd4k4iwvhNSg1wWFDVyQlHGimeD3qSoEV3QAza87gmvKNVQwkyKHIy5k7pMVE+poD7OBUtEW5M2xlzQvMqLpfTrbByNpjIp4jLtqIGrN4/MrwjSM3QJ6OcsypigGJCHwMp9S2YfxBDi9ggvEQF9PUiWyJTVmrPuS5VSUurEOoAPR75vdggD+//av7bMftl8/3n3/2+7prw2DlOoPyYJ+QDRpKWygICnimM8H7EsKVYgVmVXDqPU1Fqj6YcNvdE3W0avSj1zWZDIxRWwiDuAIaaFJhlTOjlub0gQ1HUPPbAo+nPThrT2BNozyBIPuET0f5oz3XNbb+8CBw0ZBmgQUycCeS0nWQ9MfrDyjPNXz0IL59c7VAHpfDIDZPjSwDP9PLBixDWx72Ts9PrYOiTMpOXxmfoMr0vyZbQfNwnKqV1X9XfKEzhiniV1/HvGqHRlNppmdqPG1EesdYYAmmCaPbNNdPFZktrvW0VqL+gvbgz12iG2rep3ZGDj2WDoawz0Jy48kCU3uiQRHQcuSoq3C/UeBO5h4DHGha564AhglbGl/uJ8o0wzP7J595EGcEaUObXUCphSw9GdCopshLDBuK8SscEHXtbUTj8JvwEZWKGONERSHeMwwMDBD138Yj8dOmwOk3e/Pdz8/2f30x/aXH//7+9GrcKOgU1sx2f773fbJ0+03j148/zNEGnZ+qwqg68AD+eLxs8btzhuG7L76Bz3G7I6ETXMJhx7Xvaoh0VAYBR3Rcan0OqOgYlHQBC3TUmu8xGxbpyRepFLg2IVw64y+Q+j0XXdKMiFDuJqjfNYwFTKhaOGCO0OBzWc8DeGsWMEJfnTCfEkSVqoQbtfmHKeHcV+ydI4zdHJszdiT4b7Nls2cugA8RXWiWFI5y8RVCKTUwpoSprC2dQjTTMSLA3InSAUvQpbArdPTU3RZovXp03SlfZKxlIcQ49VEpc3dc54KlCXvgiyJ7Pn+svBjH4VlGNSvU1w9IRzX670YdWl4oG19eBSM9ii6N/DcA+HnpBg+VILjC2aZ4dhaBz5ceNc6vMhrnxZjjry51oUKg6DkxSJF2fKgjXjPtFrpgKo8YHiBrBA/8uobJfJuRDkAQGm1s5hr1KI0tSB/jRPEZyy9xh5RCpZR+Wlhro7DKkiGvfvY2uoLwtnjOY0Xr7E/VCtH9AJfNCqXtFOGu4Gc++6DT7CbHWcukjLD6Buc+P6IrDQcXdj7OPRIuyuUYfuRbQY281LdXeETppqiDFGrho2PPHzP79xQekv3dHh7r2L1EuyOC1o=
:::

## API

| 属性                                                                                                                   | 类型                                                         | 默认值     | 描述                                                                                                                                          |
|:---------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------|:--------|:--------------------------------------------------------------------------------------------------------------------------------------------|
| [initialPage](/api-reference/hooks/use-pagination/pagination-options.md#initialpage)                                 | `number`                                                   | `1`     | 初始页码                                                                                                                                        |
| [initialPageSize](/api-reference/hooks/use-pagination/pagination-options.md#initialpagesize)                         | `number`                                                   | `10`    | 初始每页数据条数                                                                                                                                    |
| [target](/api-reference/hooks/use-pagination/pagination-options.md#target)                                           | `MaybeRef<HTMLElement> \| ShallowRef<HTMLElement \| null>` | `-`     | <ul> <li>父级容器，如果存在，则在滚动到底部时，分页自动`+1`,然后加载数据。</li><li>避免重复触发，请求期间不会触发滚动到底部的事件。</li></ul>                                                     |
| [addedMode](/api-reference/hooks/use-pagination/pagination-options.md#addedmode)                                     | `boolean`                                                  | `false` | <ul> <li>追加模式</li><li>启用后会自动将新请求的数据追加到已有列表中，例如第一次请求返回 `[1, 2, 3]`，第二次返回 `[4, 5, 6]`，最终列表将合并为 `[1, 2, 3, 4, 5, 6]`。该功能常用于「加载更多」场景。</li></ul> |
| [pageWatch](/api-reference/hooks/use-pagination/pagination-options.md#pagewatch)                                     | `boolean`                                                  | `true`  | 当 `page` 变化的时候自动调用服务                                                                                                                        |
| [resetPageWhenPageSizeChange](/api-reference/hooks/use-pagination/pagination-options.md#resetpagewhenpagesizechange) | `boolean`                                                  | `true`  | 当 `pageSize` 变化的时候重置 `page`到`1`                                                                                                             |
