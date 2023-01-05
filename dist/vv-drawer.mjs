import { ref as d, onMounted as p, provide as v, openBlock as u, createElementBlock as c, normalizeClass as y, createElementVNode as O, createVNode as E, Transition as h, withCtx as _, normalizeStyle as D, renderSlot as S, createCommentVNode as M, createApp as g, inject as B, h as m } from "vue";
const w = Symbol("drawer_handler");
const N = {
  __name: "DrawerContainer",
  props: {
    emitClose: { type: Function, required: !0 },
    emitOk: { type: Function, required: !0 },
    width: { type: String, default: "70%" },
    closeOnMask: { type: Boolean, default: !0 },
    customClass: { type: String, default: "" }
  },
  setup(e) {
    const t = e, n = d(!1);
    p(() => {
      setTimeout(() => {
        n.value = !0;
      }, 0);
    });
    const o = () => {
      n.value = !1, setTimeout(() => {
        t.emitClose();
      }, 330);
    };
    v(w, {
      emitClose: o,
      emitOk: (r) => {
        t.emitOk(r);
      }
    });
    function a() {
      t.closeOnMask && o();
    }
    return (r, i) => (u(), c("div", {
      class: y(["drawer-container", e.customClass])
    }, [
      O("div", {
        class: "mask",
        onClick: a
      }),
      E(h, { name: "fade-in-right" }, {
        default: _(() => [
          n.value ? (u(), c("div", {
            key: 0,
            class: "body",
            style: D({ width: e.width })
          }, [
            S(r.$slots, "default")
          ], 4)) : M("", !0)
        ]),
        _: 3
      })
    ], 2));
  }
};
function T(e, t) {
  const { component: n, onClose: o, onOk: s, width: a, closeOnMask: r, customClass: i, propsData: f } = e;
  return {
    setup() {
      const l = d(!1);
      p(() => {
        l.value = !0;
      });
      const k = {
        width: a,
        closeOnMask: r,
        customClass: i,
        emitClose: () => {
          l.value = !1, o(), setTimeout(t, 0);
        },
        emitOk: (C) => {
          s(C);
        }
      };
      return () => l.value ? m(N, k, { default: () => m(n, f) }) : null;
    }
  };
}
function R() {
  let e = null, t = null;
  const n = () => {
    t && (t.unmount(), t = null), e && (e.remove(), e = null);
  };
  return (o) => {
    t = g(T(o, n)), e = document.createElement("div"), document.body.append(e), t.mount(e);
  };
}
function V() {
  return B(w);
}
export {
  R as useDrawer,
  V as useDrawerService
};
//# sourceMappingURL=vv-drawer.mjs.map
