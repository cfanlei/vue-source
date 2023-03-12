const { render, staticRenderFns } = compileToFunctions(
    template,
    {
      outputSourceRange: __DEV__,
      shouldDecodeNewlines,
      shouldDecodeNewlinesForHref,
      delimiters: options.delimiters,
      comments: options.comments
    },
    this 
    
//=========================baseOptions
  
    const baseOptions = {
       expectHTML: true,
       modules: [
         {
           staticKeys: [
             "staticClass",
           ],
           transformNode: function transformNode$1(el, options) {
             var warn = options.warn || baseWarn;
             var staticClass = getAndRemoveAttr(el, 'class');
             if (staticClass) {
                 var res = parseText(staticClass, options.delimiters);
                 if (res) {
                     warn("class=\"".concat(staticClass, "\": ") +
                         'Interpolation inside attributes has been removed. ' +
                         'Use v-bind or the colon shorthand instead. For example, ' +
                         'instead of <div class="{{ val }}">, use <div :class="val">.', el.rawAttrsMap['class']);
                 }
             }
             if (staticClass) {
                 el.staticClass = JSON.stringify(staticClass.replace(/\s+/g, ' ').trim());
             }
             var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
             if (classBinding) {
                 el.classBinding = classBinding;
             }
           },
           genData: function genData$2(el) {
             var data = '';
             if (el.staticClass) {
                 data += "staticClass:".concat(el.staticClass, ",");
             }
             if (el.classBinding) {
                 data += "class:".concat(el.classBinding, ",");
             }
             return data;
           },
         },
         {
           staticKeys: [
             "staticStyle",
           ],
           transformNode: function transformNode(el, options) {
             var warn = options.warn || baseWarn;
             var staticStyle = getAndRemoveAttr(el, 'style');
             if (staticStyle) {
                 /* istanbul ignore if */
                 {
                     var res = parseText(staticStyle, options.delimiters);
                     if (res) {
                         warn("style=\"".concat(staticStyle, "\": ") +
                             'Interpolation inside attributes has been removed. ' +
                             'Use v-bind or the colon shorthand instead. For example, ' +
                             'instead of <div style="{{ val }}">, use <div :style="val">.', el.rawAttrsMap['style']);
                     }
                 }
                 el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
             }
             var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
             if (styleBinding) {
                 el.styleBinding = styleBinding;
             }
           },
           genData: function genData$1(el) {
             var data = '';
             if (el.staticStyle) {
                 data += "staticStyle:".concat(el.staticStyle, ",");
             }
             if (el.styleBinding) {
                 data += "style:(".concat(el.styleBinding, "),");
             }
             return data;
           },
         },
         {
           preTransformNode: function preTransformNode(el, options) {
             if (el.tag === 'input') {
                 var map = el.attrsMap;
                 if (!map['v-model']) {
                     return;
                 }
                 var typeBinding = void 0;
                 if (map[':type'] || map['v-bind:type']) {
                     typeBinding = getBindingAttr(el, 'type');
                 }
                 if (!map.type && !typeBinding && map['v-bind']) {
                     typeBinding = "(".concat(map['v-bind'], ").type");
                 }
                 if (typeBinding) {
                     var ifCondition = getAndRemoveAttr(el, 'v-if', true);
                     var ifConditionExtra = ifCondition ? "&&(".concat(ifCondition, ")") : "";
                     var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
                     var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
                     // 1. checkbox
                     var branch0 = cloneASTElement(el);
                     // process for on the main node
                     processFor(branch0);
                     addRawAttr(branch0, 'type', 'checkbox');
                     processElement(branch0, options);
                     branch0.processed = true; // prevent it from double-processed
                     branch0.if = "(".concat(typeBinding, ")==='checkbox'") + ifConditionExtra;
                     addIfCondition(branch0, {
                         exp: branch0.if,
                         block: branch0
                     });
                     // 2. add radio else-if condition
                     var branch1 = cloneASTElement(el);
                     getAndRemoveAttr(branch1, 'v-for', true);
                     addRawAttr(branch1, 'type', 'radio');
                     processElement(branch1, options);
                     addIfCondition(branch0, {
                         exp: "(".concat(typeBinding, ")==='radio'") + ifConditionExtra,
                         block: branch1
                     });
                     // 3. other
                     var branch2 = cloneASTElement(el);
                     getAndRemoveAttr(branch2, 'v-for', true);
                     addRawAttr(branch2, ':type', typeBinding);
                     processElement(branch2, options);
                     addIfCondition(branch0, {
                         exp: ifCondition,
                         block: branch2
                     });
                     if (hasElse) {
                         branch0.else = true;
                     }
                     else if (elseIfCondition) {
                         branch0.elseif = elseIfCondition;
                     }
                     return branch0;
                 }
             }
           },
         },
       ],
       directives: {
         model: function model$1(el, dir, _warn) {
           warn$1 = _warn;
           var value = dir.value;
           var modifiers = dir.modifiers;
           var tag = el.tag;
           var type = el.attrsMap.type;
           {
               // inputs with type="file" are read only and setting the input's
               // value will throw an error.
               if (tag === 'input' && type === 'file') {
                   warn$1("<".concat(el.tag, " v-model=\"").concat(value, "\" type=\"file\">:\n") +
                       "File inputs are read only. Use a v-on:change listener instead.", el.rawAttrsMap['v-model']);
               }
           }
           if (el.component) {
               genComponentModel(el, value, modifiers);
               // component v-model doesn't need extra runtime
               return false;
           }
           else if (tag === 'select') {
               genSelect(el, value, modifiers);
           }
           else if (tag === 'input' && type === 'checkbox') {
               genCheckboxModel(el, value, modifiers);
           }
           else if (tag === 'input' && type === 'radio') {
               genRadioModel(el, value, modifiers);
           }
           else if (tag === 'input' || tag === 'textarea') {
               genDefaultModel(el, value, modifiers);
           }
           else if (!config.isReservedTag(tag)) {
               genComponentModel(el, value, modifiers);
               // component v-model doesn't need extra runtime
               return false;
           }
           else {
               warn$1("<".concat(el.tag, " v-model=\"").concat(value, "\">: ") +
                   "v-model is not supported on this element type. " +
                   "If you are working with contenteditable, it's recommended to " +
                   'wrap a library dedicated for that purpose inside a custom component.', el.rawAttrsMap['v-model']);
           }
           // ensure runtime directive metadata
           return true;
         },
         text: function text(el, dir) {
           if (dir.value) {
               addProp(el, 'textContent', "_s(".concat(dir.value, ")"), dir);
           }
         },
         html: function html(el, dir) {
           if (dir.value) {
               addProp(el, 'innerHTML', "_s(".concat(dir.value, ")"), dir);
           }
         },
       },
       isPreTag: function (tag) { return tag === 'pre'; },
       isUnaryTag: function (val) { return map[val]; },
       mustUseProp: function (tag, type, attr) {
         return ((attr === 'value' && acceptValue(tag) && type !== 'button') ||
             (attr === 'selected' && tag === 'option') ||
             (attr === 'checked' && tag === 'input') ||
             (attr === 'muted' && tag === 'video'));
       },
       canBeLeftOpenTag: function (val) { return map[val]; },
       isReservedTag: function (tag) {
         return isHTMLTag(tag) || isSVG(tag);
       },
       getTagNamespace: function getTagNamespace(tag) {
         if (isSVG(tag)) {
             return 'svg';
         }
         // basic support for MathML
         // note it doesn't support other MathML elements being component roots
         if (tag === 'math') {
             return 'math';
         }
       },
       staticKeys: "staticClass,staticStyle",
     }
  )
//========================


const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }

//========================

const createCompiler = createCompilerCreator(function baseCompile(
    template: string,
    options: CompilerOptions
  ): CompiledResult {
    const ast = parse(template.trim(), options)
    if (options.optimize !== false) {
      optimize(ast, options)
    }
    const code = generate(ast, options)
    return {
      ast,
      render: code.render,
      staticRenderFns: code.staticRenderFns
    }
  })
  

  
  
  //=========================   createCompilerCreator
  
  function createCompilerCreator(baseCompile: Function): Function {
    return function createCompiler(baseOptions: CompilerOptions) {
      function compile(
        template: string,
        options?: CompilerOptions
      ): CompiledResult {
        const finalOptions = Object.create(baseOptions)
        const errors: WarningMessage[] = []
        const tips: WarningMessage[] = []
  
        let warn = (
          msg: WarningMessage,
          range: { start: number; end: number },
          tip: string
        ) => {
          ;(tip ? tips : errors).push(msg)
        }
  
        if (options) {
          if (__DEV__ && options.outputSourceRange) {
            // $flow-disable-line
            const leadingSpaceLength = template.match(/^\s*/)![0].length
  
            warn = (
              msg: WarningMessage | string,
              range: { start: number; end: number },
              tip: string
            ) => {
              const data: WarningMessage = typeof msg === 'string' ? { msg } : msg
              if (range) {
                if (range.start != null) {
                  data.start = range.start + leadingSpaceLength
                }
                if (range.end != null) {
                  data.end = range.end + leadingSpaceLength
                }
              }
              ;(tip ? tips : errors).push(data)
            }
          }
          // merge custom modules
          if (options.modules) {
            finalOptions.modules = (baseOptions.modules || []).concat(
              options.modules
            )
          }
          // merge custom directives
          if (options.directives) {
            finalOptions.directives = extend(
              Object.create(baseOptions.directives || null),
              options.directives
            )
          }
          // copy other options
          for (const key in options) {
            if (key !== 'modules' && key !== 'directives') {
              finalOptions[key] = options[key as keyof CompilerOptions]
            }
          }
        }
  
        finalOptions.warn = warn
  
        const compiled = baseCompile(template.trim(), finalOptions)
        if (__DEV__) {
          detectErrors(compiled.ast, warn)
        }
        compiled.errors = errors
        compiled.tips = tips
        return compiled
      }
  
      return {
        compile,
        compileToFunctions: createCompileToFunctionFn(compile)
      }
    }
  }
  
  
  //============================= createCompileToFunctionFn
  function createCompileToFunctionFn(compile: Function): Function {
    const cache = Object.create(null)
  
    return function compileToFunctions(
      template: string,
      options?: CompilerOptions,
      vm?: Component
    ): CompiledFunctionResult {
      options = extend({}, options)
      const warn = options.warn || baseWarn
      delete options.warn
  
      /* istanbul ignore if */
      if (__DEV__) {
        // detect possible CSP restriction
        try {
          new Function('return 1')
        } catch (e: any) {
          if (e.toString().match(/unsafe-eval|CSP/)) {
            warn(
              'It seems you are using the standalone build of Vue.js in an ' +
                'environment with Content Security Policy that prohibits unsafe-eval. ' +
                'The template compiler cannot work in this environment. Consider ' +
                'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
                'templates into render functions.'
            )
          }
        }
      }
  
      // check cache
      const key = options.delimiters
        ? String(options.delimiters) + template
        : template
      if (cache[key]) {
        return cache[key]
      }
  
      // compile
      const compiled = compile(template, options)
  
      // check compilation errors/tips
      if (__DEV__) {
        if (compiled.errors && compiled.errors.length) {
          if (options.outputSourceRange) {
            compiled.errors.forEach(e => {
              warn(
                `Error compiling template:\n\n${e.msg}\n\n` +
                  generateCodeFrame(template, e.start, e.end),
                vm
              )
            })
          } else {
            warn(
              `Error compiling template:\n\n${template}\n\n` +
                compiled.errors.map(e => `- ${e}`).join('\n') +
                '\n',
              vm
            )
          }
        }
        if (compiled.tips && compiled.tips.length) {
          if (options.outputSourceRange) {
            compiled.tips.forEach(e => tip(e.msg, vm))
          } else {
            compiled.tips.forEach(msg => tip(msg, vm))
          }
        }
      }
  
      // turn code into functions
      const res: any = {}
      const fnGenErrors: any[] = []
      res.render = createFunction(compiled.render, fnGenErrors)
      res.staticRenderFns = compiled.staticRenderFns.map(code => {
        return createFunction(code, fnGenErrors)
      })
  
      // check function generation errors.
      // this should only happen if there is a bug in the compiler itself.
      // mostly for codegen development use
      /* istanbul ignore if */
      if (__DEV__) {
        if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
          warn(
            `Failed to generate render function:\n\n` +
              fnGenErrors
                .map(
                  ({ err, code }) => `${(err as any).toString()} in\n\n${code}\n`
                )
                .join('\n'),
            vm
          )
        }
      }
  
      return (cache[key] = res)
    }
  }
  
  
  
  
  
  