declare module "godot" {
    interface SceneNodes {
        "main.tscn": {
            Control: Control<
                {
                    Button: Button<
                        {
                            JSButtonChildNode: Node<{}>,
                        }
                    >,
                    Label: Label<{}>,
                    TextEdit: TextEdit<
                        {
                            "@HScrollBar@23044": HScrollBar<{}>,
                            "@VScrollBar@23045": VScrollBar<{}>,
                            "@Timer@23046": Timer<{}>,
                            "@Timer@23047": Timer<{}>,
                            "@Timer@23048": Timer<{}>,
                        }
                    >,
                    Sprite2D: Sprite2D<{}>,
                }
            >,
            BareJSNode: Node<{}>,
        },
    }
}
