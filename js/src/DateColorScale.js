/* Copyright 2015 Bloomberg Finance L.P.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var d3 = require("d3");
var _ = require("underscore");
var colorscale = require("./ColorScale");
var colorutils = require("./ColorUtils");

var DateColorScale = colorscale.ColorScale.extend({

    render: function() {
        this.scale = d3.time.scale();
        if(this.model.domain.length > 0) {
            this.scale.domain(this.model.domain);
        }
        this.offset = 0;
        if(this.model.get("colors").length === 0) {
           this.divergent = this.model.divergent = colorutils.is_divergent(this.model.get("scheme"));
        } else {
            this.divergent = this.model.divergent = (this.model.get("colors").length > 2);
        }
        this.set_range();

        this.listenTo(this.model, "domain_changed", this.model_domain_changed, this);
        this.model.on_some_change(["colors", "scheme"], this.colors_changed, this);
    }
});

module.exports = {
    DateColorScale: DateColorScale
};
